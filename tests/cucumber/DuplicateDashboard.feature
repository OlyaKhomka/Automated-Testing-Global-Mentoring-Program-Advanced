Feature: Verify Duplicate Dashboard Flow on the Report Portal > Dashboard Page

    Scenario: Duplicate Dashboard
        Given I navigate to "/ui/#{DASHBOARD_NAME}/dashboard"
        And I generate and remember Test Data as 'testData'
        And I add new dashboard with the remembered name 'testData' and description 'testData'
        And I reload the page
        And I navigate to "/ui/#{DASHBOARD_NAME}/dashboard"
        When I click 'Duplicate' button in table row with remembered name 'testData'
        And I click 'Dashboard Page > Duplicate Option'
        And I type 'nametest' into 'Dashboard Page > Dashboard Name'
        And I type 'descriptiontest' into 'Dashboard Page > Dashboard Description'
        And I click 'Dashboard Page > Confirm Duplicate Component > Confirm Duplicate Button'
        Then I expect dashboard with the following name & description to be visible:
            | name        | nametest        |
            | description | descriptiontest |