import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class RomanNumeralTest {
   @Test 
    public void firstTest() {
       assertThat(RomanNumeral.convert(0)).isEqualTo("");
   }

}