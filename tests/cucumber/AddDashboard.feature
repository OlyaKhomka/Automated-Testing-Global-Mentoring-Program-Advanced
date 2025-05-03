Feature: Verify Add Dashboard Flow on the Report Portal > Dashboard Page

  Background: Navigate to Report Portal > Dashboard Page
    Given I navigate to '/ui/#default_personal/dashboard'

  Scenario: Add dashboard & configure widget and check if they are present. Memory logic invoking test
    And I generate and remember Test Data as 'testData'
    And I add new dashboard with the remembered name 'testData' and description 'description'
    Then I expect 'Dashboard Page > No Widget Message' to be visible
    And I add new widget with 'Launch statistics chart' widget type & remembered 'testData' filter name & remembered 'testData' launch name
    And I navigate to "/ui/#default_personal/dashboard"
    Then I expect dashboard with remembered 'testData' name to be visible

  Scenario: Add dashboard & configure widget and check if they are present. Data Table usage not to invoke recall, remember methods
    And I add new dashboard with the name "ValidName1" and description "ValidDescription1"
    Then I expect 'Dashboard Page > No Widget Message' to be visible
    And I navigate to "/ui/"
    Then I expect dashboard with the following name & description to be visible:
      | Name        | ValidName        |
      | Description | ValidDescription1 |

  Scenario Outline: Add dashboard & check the validation of the Name & Description Fields
    And I click 'Dashboard Page > Add Dashboard Button'
    And I type '<name>' into 'Dashboard Page > Dashboard Name'
    And I type '<description>' into 'Dashboard Page > Dashboard Description'
    And I click 'Dashboard Page > Add Button'
    And I navigate to "/ui/"
    Then I expect dashboard with '<name>' name to be visible
    But I expect 'Dashboard Page > Duplicate Dashboard Error' to not be visible

    Examples:
      | name  | description |
      | test3 | test3       |
      | test4 | test4       |
