Feature: Login

  Scenario: #1 User login success
    Given User open Login page
    When User login with user validate user information
    Then User redirect to home page
