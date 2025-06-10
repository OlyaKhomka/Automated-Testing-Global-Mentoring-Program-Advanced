Feature: Verify Add Dashboard Flow on the Report Portal > Dashboard Page

  Background: Navigate to Report Portal > Dashboard Page
    Given I navigate to "/ui/#{DASHBOARD_NAME}/dashboard"

  Scenario: Add dashboard & configure widget and check if they are present. Memory logic invoking test
    And I generate and remember Test Data as 'testData'
    And I add new dashboard with the remembered name 'testData' and description 'testData'
    Then I expect 'Dashboard Page > No Widget Message' to be visible
    And I add new widget with the following remembered details:
      | widgetType | Launch statistics chart |
      | filterName | testData                |
      | launchName | testData                |
    And I reload the page
    And I navigate to "/ui/#{DASHBOARD_NAME}/dashboard"
    Then I expect dashboard with remembered 'testData' name to be visible

  Scenario: Add dashboard & configure widget and check if they are present. Data Table usage not to invoke recall, remember methods
    And I generate and remember Test Data as 'testData'
    And I add new dashboard with the remembered name 'testData' and description 'testData'
    Then I expect 'Dashboard Page > No Widget Message' to be visible
    And I reload the page
    And I navigate to "/ui/#{DASHBOARD_NAME}/dashboard"
    Then I expect dashboard with the following name & description to be visible:
      | Name        | testData |
      | Description | testData |

  Scenario Outline: Add dashboard & check the validation of the Name & Description Fields
    And I click 'Dashboard Page > Add Dashboard Button'
    And I type '<name>' into 'Dashboard Page > Dashboard Name'
    And I type '<description>' into 'Dashboard Page > Dashboard Description'
    And I click 'Dashboard Page > Add Button'
    And I reload the page
    And I navigate to "/ui/#{DASHBOARD_NAME}/dashboard"
    Then I expect dashboard with '<name>' name to be visible
    But I expect 'Dashboard Page > Duplicate Dashboard Error' to not be visible

    Examples:
      | name  | description |
      | test1 | test1       |
      | test2 | test1       |
