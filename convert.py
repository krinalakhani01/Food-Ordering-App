import pandas as pd

# Step 1: Read Excel file (make sure menu.xlsx is in the same folder)
df = pd.read_excel("menu.xlsx")

# Step 2: Convert to JSON
df.to_json("menu.json", orient="records", indent=2)

print("✅ menu.json created successfully!")
