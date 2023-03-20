module.exports = {
    roots: ["<rootDir>"],
    preset: "ts-jest",
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.ts?$": "ts-jest"
    },
    moduleFileExtensions: ["ts", "tsx", "js", "json"],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    },
    collectCoverage: true,
    collectCoverageFrom: ["**/*.{ts,tsx}"],
    coverageDirectory: "coverage",
    moduleNameMapper: {
        "\\.(css|less)$": "identity-obj-proxy"
    }
};
