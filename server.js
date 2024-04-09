const mqtt = require('mqtt');

// กำหนดข้อมูลของ MQTT Broker
const brokerUrl = 'tcp://broker.mqtt.cool:1883';
// topic
const topic = 'topic';

// สร้าง MQTT Client
const client = mqtt.connect(brokerUrl);

// เมื่อเชื่อมต่อกับ MQTT Broker สำเร็จ
client.on('connect', () => {
    console.log('Connected to MQTT broker');

    // ส่งข้อความทุกๆ 10 วินาที โดยใช้ QoS เป็น 1
    setInterval(() => {
        client.publish(topic, 'Hello World', { qos: 1 }, (err) => {
            if (err) {
                console.error('Error publishing message:', err);
            } else {
                console.log('Message sent to topic:', topic);
            }
        });
    }, 1000); // หน่วงเวลา 10 วินาที (10,000 มิลลิวินาที)
});

// รับข้อความจาก MQTT Broker
client.on('message', (topic, message) => {
    console.log('Received message from topic:', topic, 'Message:', message.toString());
});
