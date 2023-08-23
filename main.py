radio.set_group(1)
radio.set_transmit_power(7)

def on_forever():
    radio.send_number(1)
basic.forever(on_forever)
