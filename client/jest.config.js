module.exports = {
    roots: ["<rootDir>"],
    preset: "ts-jest",
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.ts?$": "ts-jest",
    },
    // testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$",
    // moduleFileExtensions: ["ts", "js", "json", "node"],
    moduleFileExtensions: ["ts", "tsx", "js", "json"],
    // setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        },
    },
    collectCoverage: true,
    collectCoverageFrom: ["**/*.{ts,tsx}"],
    coverageDirectory: "coverage",
    moduleNameMapper: {
        "\\.(css|less)$": "identity-obj-proxy"
    }
};