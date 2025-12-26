import { useState, useEffect } from "react";
import {
  X,
  Clock,
  Users,
  TrendingUp,
  AlertTriangle,
  UtensilsCrossed,
} from "lucide-react";
import { Order } from "../../types";

interface RushHourChatbotProps {
  orders: Order[];
}

export function RushHourChatbot({ orders }: RushHourChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    { text: string; isBot: boolean; time: string }[]
  >([]);
  const [hasNewUpdate, setHasNewUpdate] = useState(false);

  // Calculate rush hour status
  const getRushHourStatus = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const nextHour = currentHour + 1;

    // Count orders for current and next hour
    const currentHourOrders = orders.filter((order) => {
      const orderHour = order.pickupTime.getHours();
      return orderHour === currentHour && order.status !== "completed";
    }).length;

    const nextHourOrders = orders.filter((order) => {
      const orderHour = order.pickupTime.getHours();
      return orderHour === nextHour && order.status !== "completed";
    }).length;

    const pendingOrders = orders.filter(
      (o) => o.status === "pending" || o.status === "preparing"
    ).length;

    let rushLevel: "low" | "medium" | "high";
    let recommendation: string;
    let waitTime: number;

    if (currentHourOrders > 15 || pendingOrders > 10) {
      rushLevel = "high";
      recommendation =
        "🔴 It's very busy right now! Consider ordering for a later time or expect longer wait times.";
      waitTime = 20;
    } else if (currentHourOrders > 8 || pendingOrders > 5) {
      rushLevel = "medium";
      recommendation =
        "🟡 Moderately busy. Your order will be prepared soon, but there might be a slight wait.";
      waitTime = 12;
    } else {
      rushLevel = "low";
      recommendation =
        "🟢 Great time to order! The canteen is not busy right now. Quick service expected!";
      waitTime = 8;
    }

    return {
      rushLevel,
      currentHourOrders,
      nextHourOrders,
      pendingOrders,
      recommendation,
      waitTime,
    };
  };

  const status = getRushHourStatus();

  useEffect(() => {
    if (!isOpen && status.rushLevel === "high") {
      setHasNewUpdate(true);
    }
  }, [status.rushLevel, isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    setHasNewUpdate(false);

    if (messages.length === 0) {
      const now = new Date();
      const greeting = `Hi! 👋 I'm your Foodie assistant. Let me check the current rush status for you...`;

      setTimeout(() => {
        setMessages([
          {
            text: greeting,
            isBot: true,
            time: now.toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);

        setTimeout(() => {
          const statusMessage = getStatusMessage();
          const newTime = new Date();
          setMessages((prev) => [
            ...prev,
            {
              text: statusMessage,
              isBot: true,
              time: newTime.toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
          ]);
        }, 800);
      }, 300);
    }
  };

  const getStatusMessage = () => {
    const status = getRushHourStatus();
    const now = new Date();
    const currentTime = now.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });

    let message = `📊 **Live Canteen Status** (${currentTime})\n\n`;
    message += `${status.recommendation}\n\n`;
    message += `**Current Stats:**\n`;
    message += `• Orders in queue: ${status.pendingOrders}\n`;
    message += `• This hour: ${status.currentHourOrders} orders\n`;
    message += `• Next hour: ${status.nextHourOrders} orders\n`;
    message += `• Estimated wait: ~${status.waitTime} mins\n\n`;

    if (status.rushLevel === "low") {
      message += `💡 **Tip:** Perfect time to grab your favorite meal without the wait!`;
    } else if (status.rushLevel === "medium") {
      message += `💡 **Tip:** Pre-order now for later pickup to skip the queue!`;
    } else {
      message += `💡 **Tip:** Consider waiting 30-45 minutes or ordering for later pickup.`;
    }

    return message;
  };

  const quickQuestions = [
    { text: "When's the best time?", icon: Clock },
    { text: "How busy is it?", icon: Users },
    { text: "Refresh status", icon: TrendingUp },
  ];

  const handleQuickQuestion = (question: string) => {
    const now = new Date();
    setMessages((prev) => [
      ...prev,
      {
        text: question,
        isBot: false,
        time: now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

    setTimeout(() => {
      let response = "";
      const newTime = new Date();

      if (question.includes("best time")) {
        const nextGoodTime = new Date();
        if (status.rushLevel === "high") {
          nextGoodTime.setHours(nextGoodTime.getHours() + 1);
        }
        response = `Based on current trends, the next good time to visit would be around ${nextGoodTime.toLocaleTimeString(
          "en-IN",
          { hour: "2-digit", minute: "2-digit" }
        )}. Rush hours are typically 12:00 PM - 1:30 PM and 5:00 PM - 6:30 PM. 🕐`;
      } else if (question.includes("busy")) {
        response = getStatusMessage();
      } else {
        response = `✅ Status refreshed!\n\n${getStatusMessage()}`;
      }

      setMessages((prev) => [
        ...prev,
        {
          text: response,
          isBot: true,
          time: newTime.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }, 600);
  };

  const getRushIcon = () => {
    switch (status.rushLevel) {
      case "high":
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case "medium":
        return <Clock className="w-5 h-5 text-amber-500" />;
      default:
        return <Users className="w-5 h-5 text-green-500" />;
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 bg-gradient-to-br from-orange-500 to-red-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 group hover:scale-110"
      >
        <div className="relative">
          <UtensilsCrossed className="w-6 h-6" />
          {hasNewUpdate && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
          )}
        </div>
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Check Rush Hours
        </div>
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <UtensilsCrossed className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white">Foodie Assistant</h3>
                <div className="flex items-center gap-2 text-white/90 text-sm">
                  {getRushIcon()}
                  <span>
                    {status.rushLevel === "high"
                      ? "Very Busy"
                      : status.rushLevel === "medium"
                      ? "Moderately Busy"
                      : "Not Busy"}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.isBot ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.isBot
                      ? "bg-white border border-gray-200 text-gray-800"
                      : "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{msg.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.isBot ? "text-gray-400" : "text-white/70"
                    }`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Questions */}
          <div className="p-4 bg-white border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-2">Quick actions:</p>
            <div className="flex gap-2 flex-wrap">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickQuestion(q.text)}
                  className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg hover:border-orange-400 transition-colors text-sm text-gray-700"
                >
                  <q.icon className="w-4 h-4 text-orange-500" />
                  {q.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
