import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

import static org.assertj.core.api.Assertions.assertThat;

public class MyStepdefs {

    private int arabicNumber;
    private String actualRomanNumber;

    @Given("Arabic number is {int}")
    public void arabicNumberIs(int arabicNumber) {
        this.arabicNumber = arabicNumber;
    }

    @When("I ask for Roman version")
    public void iAskForRomanVersion() {
        this.actualRomanNumber = RomanNumeral.convert(arabicNumber);
    }

    @Then("I should get {string}")
    public void iShouldGet(String expectedRomanNumber) {
        assertThat(actualRomanNumber).isEqualTo(expectedRomanNumber);
    }
}
