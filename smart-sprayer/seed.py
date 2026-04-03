from app.db.database import SessionLocal, engine, Base
from app.models import Plant, Disease, Pesticide

def seed_database():
    # Create tables
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()

    try:
        # Check if data already exists
        existing_plants = db.query(Plant).count()
        if existing_plants > 0:
            print("Database already seeded!")
            return

        # Create plants
        tomato = Plant(name="Tomato", scientific_name="Solanum lycopersicum", description="Popular vegetable crop")
        potato = Plant(name="Potato", scientific_name="Solanum tuberosum", description="Starchy root vegetable")

        db.add(tomato)
        db.add(potato)
        db.commit()

        # Create diseases
        late_blight = Disease(
            name="Late Blight",
            description="Fungal disease causing dark lesions on leaves and fruits",
            symptoms="Dark, water-soaked lesions on leaves, white fungal growth on undersides",
            plant=tomato
        )

        early_blight = Disease(
            name="Early Blight",
            description="Fungal disease affecting tomato and potato plants",
            symptoms="Dark spots with concentric rings on leaves",
            plant=tomato
        )

        potato_blight = Disease(
            name="Potato Blight",
            description="Same as late blight, affects potato plants",
            symptoms="Dark lesions on leaves, rotting tubers",
            plant=potato
        )

        db.add(late_blight)
        db.add(early_blight)
        db.add(potato_blight)
        db.commit()

        # Create pesticides
        copper_fungicide = Pesticide(
            name="Copper Fungicide",
            active_ingredient="Copper hydroxide",
            description="Broad-spectrum fungicide effective against many plant diseases",
            application_rate=2.5,
            safety_instructions="Wear protective clothing. Do not apply when raining."
        )

        chlorothalonil = Pesticide(
            name="Chlorothalonil",
            active_ingredient="Chlorothalonil",
            description="Fungicide for control of fungal diseases",
            application_rate=1.5,
            safety_instructions="Avoid contact with skin and eyes. Use in well-ventilated area."
        )

        db.add(copper_fungicide)
        db.add(chlorothalonil)
        db.commit()

        # Associate diseases with pesticides
        late_blight.pesticides.append(copper_fungicide)
        late_blight.pesticides.append(chlorothalonil)
        early_blight.pesticides.append(chlorothalonil)
        potato_blight.pesticides.append(copper_fungicide)

        db.commit()

        print("Database seeded successfully!")

    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()