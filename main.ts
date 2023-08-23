input.onButtonPressed(Button.A, function () {
    serial.writeString("" + control.deviceName() + "_" + "0")
    radio.sendString("" + control.deviceName() + "_" + "0")
})
// 挿されている場所を0-4で返す
// 刺さっていない場合は-1
function getLocation () {
    serial.writeValue(control.deviceName(), Math.ceil(Math.map(pins.analogReadPin(AnalogPin.P2), 0, 1023, -1, 4)))
    return Math.ceil(Math.map(pins.analogReadPin(AnalogPin.P2), 0, 1023, -1, 4))
}
radio.onReceivedString(function (gameEventStr) {
    if (gameEventStr.includes("" + control.deviceName() + "_")) {
        if (extractGameEventStatus(gameEventStr) == 0) {
            gameResult = "win"
        } else if (extractGameEventStatus(gameEventStr) == 1) {
            gameResult = "lose"
        } else {
        	
        }
    }
})
input.onButtonPressed(Button.B, function () {
    serial.writeString("" + control.deviceName() + "_" + "1")
    radio.sendString("" + control.deviceName() + "_" + "1")
})
function extractGameEventStatus (gameEventStr: string) {
    return parseFloat(gameEventStr.split("_")[1])
}
let gameResult = ""
radio.setGroup(1)
pins.analogWritePin(AnalogPin.P1, 1023)
basic.forever(function () {
    while (gameResult == "win") {
        basic.showIcon(IconNames.Yes)
    }
    while (gameResult == "lose") {
        basic.showIcon(IconNames.No)
    }
    radio.sendValue(control.deviceName(), getLocation())
    basic.pause(500)
})
