// lib/whatsapp.ts
export const sendWhatsAppMessage = async (message: string) => {
    const res = await fetch("/api/send-whatsapp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
  
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error?.error || "Failed to send WhatsApp message");
    }
  
    return await res.json();
  };
  