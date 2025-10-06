from fastapi import Depends, FastAPI, HTTPException
from models import Product, ProductCreate
from database import session, engine
import database_models
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from sqlalchemy.exc import IntegrityError

products =[
    ProductCreate(name="phone", description="budget phone", price= 99, quantity= 10),
    ProductCreate(name="laptop", description="gaming laptop",price= 1299,quantity= 5),
    ProductCreate(name="Pen", description="A blue ink pen", price=1.99, quantity=100),
    ProductCreate(name="Table", description="A wooden table", price=199.99, quantity=20)
]

app = FastAPI(title="Product Management API", version="1.0.0")

# Configure CORS for development - allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=False,  # Set to False when allowing all origins
    allow_methods=["*"],
    allow_headers=["*"],
) 

def get_db():
    db= session()
    try:
        yield db
    finally:
        db.close()

def init_db():
    db = session()
    try:
        # Check if products already exist
        count = db.query(database_models.Product).count()
        if count == 0:
            print("Initializing database with sample products...")
            for product in products:
                db_product = database_models.Product(**product.model_dump())
                db.add(db_product)
            db.commit()
            print(f"Successfully initialized database with {len(products)} products")
        else:
            print(f"Database already contains {count} products, skipping initialization")
    except Exception as e:
        print(f"Error initializing database: {e}")
        db.rollback()
    finally:
        db.close()

# Optional: Add a function to reset the database for development
def reset_db():
    """Only use this in development to reset the database"""
    try:
        # Drop all tables and recreate them
        database_models.Base.metadata.drop_all(bind=engine)
        database_models.Base.metadata.create_all(bind=engine)
        print("Database reset successfully")
    except Exception as e:
        print(f"Error resetting database: {e}")

# Create tables and initialize with sample data
database_models.Base.metadata.create_all(bind=engine)
init_db()

#GET, POST, PUT, DELETE
@app.get("/")
def greet():
    return {"message":"Hello from FastAPI Backend!"}

# Development endpoint to reset database
@app.post("/reset-db")
def reset_database():
    """⚠️ WARNING: This will delete all data! Only for development."""
    try:
        database_models.Base.metadata.drop_all(bind=engine)
        database_models.Base.metadata.create_all(bind=engine)
        
        # Re-initialize with sample data
        db = session()
        try:
            for product in products:
                db_product = database_models.Product(**product.model_dump())
                db.add(db_product)
            db.commit()
            return {"message": "Database reset successfully", "products_added": len(products)}
        finally:
            db.close()
    except Exception as e:
        return {"error": f"Failed to reset database: {str(e)}"}

@app.get("/products", response_model=List[Product])
def get_all_products(db: Session = Depends(get_db)):
    db_products = db.query(database_models.Product).all()
    return db_products

@app.get('/product/{id}', response_model=Product)
def get_product_by_id(id: int, db: Session = Depends(get_db)):
    db_product = db.query(database_models.Product).filter(database_models.Product.id==id).first()
    
    if db_product:
        return db_product
    raise HTTPException(status_code=404, detail="Product not found")

@app.post('/product', response_model=Product)
def add_product(product: ProductCreate, db: Session = Depends(get_db)):
    try:
        db_product = database_models.Product(**product.model_dump())
        db.add(db_product)
        db.commit()
        db.refresh(db_product)
        return db_product
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Product could not be created. Check for duplicate values.")
    except Exception:
        db.rollback()
        raise HTTPException(status_code=500, detail="Internal server error")

@app.put('/product/{id}', response_model=Product)
def update_product(id: int, product: ProductCreate, db: Session = Depends(get_db)):
    try:
        db_product = db.query(database_models.Product).filter(database_models.Product.id==id).first()
        if not db_product:
            raise HTTPException(status_code=404, detail="Product not found")
        
        for key, value in product.model_dump().items():
            setattr(db_product, key, value)
        db.commit()
        db.refresh(db_product)
        return db_product
    except HTTPException:
        raise
    except Exception:
        db.rollback()
        raise HTTPException(status_code=500, detail="Internal server error")

@app.delete('/product/{id}')
def delete_product(id: int, db: Session = Depends(get_db)):
    try:
        db_product = db.query(database_models.Product).filter(database_models.Product.id==id).first()
        if not db_product:
            raise HTTPException(status_code=404, detail="Product not found")
        
        db.delete(db_product)
        db.commit()
        return {"message": "Product Deleted Successfully"}
    except HTTPException:
        raise
    except Exception:
        db.rollback()
        raise HTTPException(status_code=500, detail="Internal server error")