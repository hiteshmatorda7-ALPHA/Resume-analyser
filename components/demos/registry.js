import ChatbotDemo from "./ChatbotDemo";
import BuilderDemo from "./BuilderDemo";
import AutomationDemo from "./AutomationDemo";
import DashboardDemo from "./DashboardDemo";
import StoreDemo from "./StoreDemo";
import RoiDemo from "./RoiDemo";

export const demoList = [
  { id: "chatbot", title: "AI receptionist", sub: "Answers customer questions and books appointments 24/7", Component: ChatbotDemo, vis: "chat", tag: "AI" },
  { id: "builder", title: "AI website generator", sub: "Type your business name and watch a website appear", Component: BuilderDemo, vis: "site", tag: "AI" },
  { id: "automation", title: "Business automation", sub: "Watch a lead become a CRM entry, WhatsApp reply and invoice", Component: AutomationDemo, vis: "flow", tag: "Automation" },
  { id: "dashboard", title: "Live business dashboard", sub: "Sales, orders and AI insights on one screen", Component: DashboardDemo, vis: "bars", tag: "Software" },
  { id: "store", title: "Online store with UPI", sub: "Shop, add to cart and check out like a real customer", Component: StoreDemo, vis: "store", tag: "E-commerce" },
  { id: "roi", title: "Automation savings calculator", sub: "See how much time and money automation can save you", Component: RoiDemo, vis: "roi", tag: "Calculator" },
];
