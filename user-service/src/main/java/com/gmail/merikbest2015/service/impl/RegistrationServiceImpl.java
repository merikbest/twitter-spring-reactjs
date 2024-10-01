package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.constants.UserErrorMessage;
import com.gmail.merikbest2015.dto.request.RegistrationRequest;
import com.gmail.merikbest2015.commons.event.SendEmailEvent;
import com.gmail.merikbest2015.commons.exception.ApiRequestException;
import com.gmail.merikbest2015.broker.producer.SendEmailProducer;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.model.UserRole;
import com.gmail.merikbest2015.broker.producer.UpdateUserProducer;
import com.gmail.merikbest2015.repository.UserRepository;
import com.gmail.merikbest2015.repository.projection.UserCommonProjection;
import com.gmail.merikbest2015.commons.security.JwtProvider;
import com.gmail.merikbest2015.service.RegistrationService;
import com.gmail.merikbest2015.service.util.UserServiceHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import static com.gmail.merikbest2015.broker.producer.SendEmailProducer.toSendRegistrationEmailEvent;

@Service
@RequiredArgsConstructor
public class RegistrationServiceImpl implements RegistrationService {

    private final UserRepository userRepository;
    private final UserServiceHelper userServiceHelper;
    private final UpdateUserProducer updateUserProducer;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final SendEmailProducer sendEmailProducer;

    @Override
    @Transactional
    public String registration(RegistrationRequest request, BindingResult bindingResult) {
        userServiceHelper.processInputErrors(bindingResult);
        Optional<User> existingUser = userRepository.getUserByEmail(request.getEmail(), User.class);

        if (existingUser.isEmpty()) {
            User user = new User();
            user.setEmail(request.getEmail());
            user.setUsername(request.getUsername());
            user.setFullName(request.getUsername());
            user.setBirthday(request.getBirthday());
            user.setRole(UserRole.USER);
            userRepository.save(user);
            updateUserProducer.sendUpdateUserEvent(user);
            return "User data checked.";
        }
        if (!existingUser.get().isActive()) {
            existingUser.get().setUsername(request.getUsername());
            existingUser.get().setFullName(request.getUsername());
            existingUser.get().setBirthday(request.getBirthday());
            userRepository.save(existingUser.get());
            updateUserProducer.sendUpdateUserEvent(existingUser.get());
            return "User data checked.";
        }
        throw new ApiRequestException(UserErrorMessage.EMAIL_HAS_ALREADY_BEEN_TAKEN, HttpStatus.FORBIDDEN);
    }

    @Override
    @Transactional
    public String sendRegistrationCode(String email, BindingResult bindingResult) {
        userServiceHelper.processInputErrors(bindingResult);
        UserCommonProjection user = userRepository.getUserByEmail(email, UserCommonProjection.class)
                .orElseThrow(() -> new ApiRequestException(UserErrorMessage.USER_NOT_FOUND, HttpStatus.NOT_FOUND));
        userRepository.updateActivationCode(UUID.randomUUID().toString().substring(0, 7), user.getId());
        String activationCode = userRepository.getActivationCode(user.getId());
        SendEmailEvent sendEmailEvent = toSendRegistrationEmailEvent(user.getEmail(), user.getFullName(), activationCode);
        sendEmailProducer.sendEmail(sendEmailEvent);
        return "Registration code sent successfully";
    }

    @Override
    @Transactional
    public String checkRegistrationCode(String code) {
        UserCommonProjection user = userRepository.getCommonUserByActivationCode(code)
                .orElseThrow(() -> new ApiRequestException(UserErrorMessage.ACTIVATION_CODE_NOT_FOUND, HttpStatus.NOT_FOUND));
        userRepository.updateActivationCode(null, user.getId());
        return "User successfully activated.";
    }

    @Override
    @Transactional
    public Map<String, Object> endRegistration(String email, String password, BindingResult bindingResult) {
        userServiceHelper.processInputErrors(bindingResult);
        if (password.length() < 8) {
            throw new ApiRequestException(UserErrorMessage.PASSWORD_LENGTH_ERROR, HttpStatus.BAD_REQUEST);
        }
        User user = userRepository.getUserByEmail(email, User.class)
                .orElseThrow(() -> new ApiRequestException(UserErrorMessage.USER_NOT_FOUND, HttpStatus.NOT_FOUND));
        userRepository.updatePassword(passwordEncoder.encode(password), user.getId());
        userRepository.updateActiveUserProfile(user.getId());
        updateUserProducer.sendUpdateUserEvent(user);
        String token = jwtProvider.createToken(email, UserRole.USER.name());
        return Map.of("user", user, "token", token);
    }
}
