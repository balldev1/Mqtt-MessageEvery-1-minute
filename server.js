const mqtt = require('mqtt');

// กำหนดข้อมูลของ MQTT Broker
const brokerUrl = 'tcp://broker.mqtt.cool:1883';
// กำหนด topic 1 และ topic 2
const topic1 = 'topic1';
const topic2 = 'topic2';

// สร้าง MQTT Client
const client = mqtt.connect(brokerUrl);

// เมื่อเชื่อมต่อกับ MQTT Broker สำเร็จ
client.on('connect', () => {
    console.log('Connected to MQTT broker');

    // ส่งข้อความทุกๆ 1 วินาที โดยใช้ QoS เป็น 1
    setInterval(() => {
        client.publish(topic1, 'Hello from topic 1', { qos: 1 }, (err) => {
            if (err) {
                console.error('Error publishing message to topic 1:', err);
            } else {
                console.log('Message sent to topic 1:', topic1);
            }
        });

        client.publish(topic2, 'Hello from topic 2', { qos: 1 }, (err) => {
            if (err) {
                console.error('Error publishing message to topic 2:', err);
            } else {
                console.log('Message sent to topic 2:', topic2);
            }
        });
    }, 1000); // หน่วงเวลา 1 วินาที (1,000 มิลลิวินาที)
});

// รับข้อความจาก MQTT Broker
client.on('message', (topic, message) => {
    console.log('Received message from topic:', topic, 'Message:', message.toString());
});
