import { Colors } from "@/constants/Colors";
import { OrderStatus } from "../enums/order-status.enum";

export const orderIconInformation = [
    {name: OrderStatus.Ordered, icon: 'event', color: Colors.black},
    {name: OrderStatus.Accepted, icon: 'check', color: Colors.black},
    {name: OrderStatus.Route, icon: 'direction', color: Colors.white},
    {name: OrderStatus.Delivered, icon: 'trophy', color: Colors.white},
    {name: OrderStatus.Denied, icon: 'exclamation', color: Colors.danger},
    {name: OrderStatus.Cancelled, icon: 'close', color: Colors.danger},
]