class Parrot {
    constructor(numberOfCoconuts, voltage, isNailed) {
        this.numberOfCoconuts = numberOfCoconuts;
        this.voltage = voltage;
        this.isNailed = isNailed;
    }

    getBaseSpeedWithVoltage(voltage) {
        return Math.min(24, voltage * this.getBaseSpeed());
    }

    getLoadFactor() {
        return 9;
    }

    getBaseSpeed() {
        return 12;
    }
}

export class European extends Parrot {
    getSpeed() {
        return super.getBaseSpeed();
    }
}

export class African extends Parrot {

    getSpeed() {
        return Math.max(0, super.getBaseSpeed() - super.getLoadFactor() * this.numberOfCoconuts);
    }
}


export class NorwegianBlue extends Parrot {
    // Vrroum vroum
    getSpeed() {
        return (this.isNailed) ? 0 : super.getBaseSpeedWithVoltage(this.voltage);
    }
}