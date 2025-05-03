Feature: Verify Duplicate Dashboard Flow on the Report Portal > Dashboard Page

    Scenario: Duplicate Dashboard
        Given I navigate to '/ui/#default_personal/dashboard'
        And I add new dashboard with the name "test12" and description "ValidDescription1"
        And I navigate to "/ui/"
        When I click 'Duplicate' button in table row with name 'test12'
        And I click 'Dashboard Page > Duplicate Option'
        And I type 'nametest' into 'Dashboard Page > Dashboard Name'
        And I type 'descriptiontest' into 'Dashboard Page > Dashboard Description'
        And I click 'Dashboard Page > Confirm Duplicate Component > Confirm Duplicate Button'
        Then I expect dashboard with the following name & description to be visible:
            | Name        | nametest1       |
            | description | descriptiontest |