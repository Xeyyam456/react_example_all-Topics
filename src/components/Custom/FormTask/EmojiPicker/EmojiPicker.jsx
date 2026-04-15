import { useState } from "react";

const emojis = [
    { label: "Grinning", value: "😀" },
    { label: "Laughing", value: "😂" },
    { label: "Heart Eyes", value: "😍" },
    { label: "Thinking", value: "🤔" },

];

function EmojiPicker() {
    const [emoji, setEmoji] = useState("😀");

    return (
        <div style={{ padding: "20px", maxWidth: "300px", margin: "40px auto", textAlign: "center" }}>
            <h2>Emoji Picker</h2>

            <div style={{ fontSize: "5rem", margin: "16px 0" }}>{emoji}</div>

            <select
                value={emoji}
                onChange={(e) => setEmoji(e.target.value)}
                style={{ padding: "8px", fontSize: "1rem", width: "100%", cursor: "pointer" }}
            >
                {emojis.map((item, index) => (
                    <option key={index}
                        value={item.value}>
                        {item.value} — {item.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default EmojiPicker;
