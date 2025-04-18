```mermaid
graph TD;
    URMS["URMS"] -->|API| MySQL
    URMS -->|Kafka| NS["Notification Service"]
    URMS -->|API| UI["User Interface"]

    SMS["Slot Mgmt Service (SMS)"] -->|API| MySQL
    SMS -->|API| URMS
    SMS -->|Kafka| NS

    SBS["Slot Booking Service (SBS)"] -->|API| MySQL
    SBS -->|API| URMS
    SBS -->|API| SMS
    SBS -->|Kafka| NS
    SBS -->|WebSockets| UI

    NS -->|Kafka Consumers| Emails["Email Delivery"]
