from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Boolean,
    DateTime,
    Enum,
    ForeignKey,
    Text
)
from sqlalchemy.orm import relationship, declarative_base
from datetime import datetime
import enum

Base = declarative_base()

class OrderStatus(str, enum.Enum):
    preparing = "preparing"
    pending = "pending"
    ready = "ready"
    completed = "completed"

class FoodCategories(str, enum.Enum):
    MainCourse = "MainCourse"
    Beverages = "Beverages"
    Snacks = "Snacks"
    Desserts = "Desserts"


#Relationships:
#1. User:Order = 1:n
#2. User: Review = 1:n
#3. Order: Orderitems = 1:n
#4. GroupOrders : GroupMembers = 1:n
#5. Food Item : Review = 1:n


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    password = Column(String, nullable=False)
    studentId = Column(String, nullable=False, unique=True, index=True)

    orders = relationship("Order", back_populates="user")
    reviews = relationship("Review", back_populates="user")


class FoodItem(Base):
    __tablename__ = "food_items"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)
    description = Column(String)
    category = Column(Enum(FoodCategories, name="food_category"), nullable=False)

    price = Column(Integer, nullable=False)
    available = Column(Boolean, default=True)
    image = Column(String)
    prepTime = Column(Integer)
    stock = Column(Integer, default=0)

    order_items = relationship("OrderItem", back_populates="food")
    reviews = relationship("Review", back_populates="food")


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))

    status = Column(Enum(OrderStatus, name="order_status"), default=OrderStatus.pending, nullable=False)
    token_no = Column(String, unique=True, index=True)
    pickup_time = Column(String)
    is_group_order = Column(Boolean)

    created_at = Column(DateTime, default=datetime.utcnow)
    total_price = Column(Integer)

    user = relationship("User", back_populates="orders")
    items = relationship("OrderItem", back_populates="order")
    group_order = relationship("GroupOrder", back_populates="order", uselist=False)

class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    food_id = Column(Integer, ForeignKey("food_items.id"))

    quantity = Column(Integer, nullable=False)

    order = relationship("Order", back_populates="items")
    food = relationship("FoodItem", back_populates="order_items")

class GroupOrder(Base):
    __tablename__ = "group_orders"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    group_code = Column(String, unique=True, index=True)

    created_at = Column(DateTime, default=datetime.utcnow)

    order = relationship("Order", back_populates="group_order")
    members = relationship("GroupMember", back_populates="group_order")

class GroupMember(Base):
    __tablename__ = "group_members"

    id = Column(Integer, primary_key=True, index=True)
    group_order_id = Column(Integer, ForeignKey("group_orders.id"))
    user_id = Column(Integer, ForeignKey("users.id"))

    created_at = Column(DateTime, default=datetime.utcnow)

    group_order = relationship("GroupOrder", back_populates="members")

class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    food_id = Column(Integer, ForeignKey("food_items.id"))

    rating = Column(Integer, nullable=False)
    comment = Column(Text)

    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="reviews")
    food = relationship("FoodItem", back_populates="reviews")


