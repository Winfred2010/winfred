class Phone:
    def __init__(self, phone_number):
        self.phone_number = phone_number
        self.call_history = []
        self.messages = []

    def call(self, other_phone):
        statement = f"{self.phone_number} called {other_phone.phone_number}"
        print(statement)
        # Add to both phones' history for a complete record
        self.call_history.append(statement)
        other_phone.call_history.append(statement)

    def show_call_history(self):
        print(f"\n--- Call History for {self.phone_number} ---")
        if not self.call_history:
            print("No calls recorded.")
        for entry in self.call_history:
            print(entry)

    def send_message(self, other_phone, content):
        message_data = {
            "to": other_phone.phone_number,
            "from": self.phone_number,
            "content": content
        }
        # Add the message object to both the sender and receiver's history
        self.messages.append(message_data)
        other_phone.messages.append(message_data)
        print(f"Message sent from {self.phone_number} to {other_phone.phone_number}")

    def show_outgoing_messages(self):
        print(f"\n--- Outgoing Messages from {self.phone_number} ---")
        outgoing = [m for m in self.messages if m["from"] == self.phone_number]
        for m in outgoing:
            print(f"To {m['to']}: {m['content']}")

    def show_incoming_messages(self):
        print(f"\n--- Incoming Messages to {self.phone_number} ---")
        incoming = [m for m in self.messages if m["to"] == self.phone_number]
        for m in incoming:
            print(f"From {m['from']}: {m['content']}")

    def show_messages_from(self, other_phone):
        print(f"\n--- Messages from {other_phone.phone_number} to {self.phone_number} ---")
        filtered = [m for m in self.messages if m["from"] == other_phone.phone_number and m["to"] == self.phone_number]
        for m in filtered:
            print(f"Content: {m['content']}")

# --- Testing the Code ---

if __name__ == "__main__":
    # Create two phone objects
    iphone = Phone("054-111-2222")
    pixel = Phone("052-999-8888")

    # Test Calls
    iphone.call(pixel)
    pixel.call(iphone)
    iphone.show_call_history()

    # Test Messages (Updated to be neutral/professional)
    iphone.send_message(pixel, "Hello! Are we still meeting for lunch today?")
    pixel.send_message(iphone, "Yes, I'll be there at 12:30.")
    iphone.send_message(pixel, "Great, see you then!")

    # Test Message Filters
    pixel.show_incoming_messages()
    iphone.show_outgoing_messages()
    pixel.show_messages_from(iphone)
