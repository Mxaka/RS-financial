"""
Wealth Health Model - Royal Square Financial
Simple but helpful finance model using sklearn LinearRegression
Input: client net worth, investments, spending, claims
Output: health score, forecast, next action
"""

import numpy as np
from sklearn.linear_model import LinearRegression

# --- 1. TRAIN MODEL ---
# Training data based on real finance patterns
# Features: [investment_ratio, spend_ratio, claims_count] -> monthly growth
X_train = np.array([
    [0.80, 0.30, 0], # High investor, low spender, no claims = high growth
    [0.70, 0.40, 0],
    [0.60, 0.50, 1],
    [0.55, 0.55, 1],
    [0.50, 0.60, 2],
    [0.40, 0.70, 2], # Medium
    [0.30, 0.80, 3], # Low investor, high spender
    [0.20, 0.90, 4],
    [0.75, 0.35, 0], # Best case
    [0.25, 0.85, 5], # Worst case
])

y_train = np.array([
    55000, # R55k growth
    40000,
    20000,
    10000,
    5000,
    -10000,
    -25000,
    -40000,
    50000,
    -45000
])

model = LinearRegression()
model.fit(X_train, y_train)
print(f"✅ Model trained - Score: {model.score(X_train, y_train):.2f}")

# --- 2. PREDICT FUNCTION ---
def predict_wealth(client):
    """
    client = {
        "total": 2450890,
        "investments": 1450000,
        "spend": 45200,
        "income": 80000,
        "claims_count": 2
    }
    """
    total = client["total"]
    investments = client["investments"]
    spend = client["spend"]
    income = client["income"]
    claims = client["claims_count"]

    inv_ratio = investments / total
    spend_ratio = spend / income

    # Predict monthly growth
    growth = float(model.predict([[inv_ratio, spend_ratio, claims]])[0])

    # Health Score (0-100) - like credit score
    score = 50
    if inv_ratio > 0.6:
        score += 25
    elif inv_ratio > 0.5:
        score += 15
    elif inv_ratio > 0.4:
        score += 5

    if spend_ratio < 0.5:
        score += 20
    elif spend_ratio < 0.6:
        score += 10
    elif spend_ratio > 0.7:
        score -= 20

    if claims == 0:
        score += 10
    elif claims == 1:
        score += 5
    elif claims > 2:
        score -= 15

    score = max(0, min(100, int(score)))

    # Status
    if score >= 75:
        status = "CREATE"
    elif score < 50:
        status = "PRESERVE"
    else:
        status = "STABLE"

    # 6-month forecast
    forecast = []
    current = total
    for i in range(1, 7):
        current += growth
        forecast.append({
            "month": i,
            "net_worth": int(current),
            "label": f"Month {i}"
        })

    # Time to R3M
    gap = 3000000 - total
    months_to_3m = int(gap / growth) if growth > 0 else 999

    # Risk
    risk = "HIGH" if spend_ratio > 0.7 or claims > 3 else "MEDIUM" if spend_ratio > 0.5 else "LOW"

    # Next action - MOST HELPFUL PART
    if status == "CREATE":
        action = f"Excellent! You're creating wealth. Add R5k/mo to reach R3M in {max(1, months_to_3m-2)} months."
    elif status == "PRESERVE":
        action = f"Warning: High spending ({spend_ratio*100:.0f}%) + {claims} claims. Cut spending to 50% of income to preserve wealth."
    else:
        action = f"Stable wealth. Increase investment from {(inv_ratio*100):.0f}% to 60% to start creating more wealth."

    return {
        "health_score": score,
        "status": status,
        "monthly_growth": int(growth),
        "current_net_worth": total,
        "forecast": forecast,
        "months_to_3m": months_to_3m,
        "risk_level": risk,
        "advice": action,
        "investment_ratio": round(inv_ratio, 2),
        "spend_ratio": round(spend_ratio, 2)
    }

# --- 3. TEST ---
if __name__ == "__main__":
    test_client = {
        "total": 2450890,
        "investments": 1450000,
        "spend": 45200,
        "income": 80000,
        "claims_count": 2
    }

    result = predict_wealth(test_client)

    print("\n--- WEALTH HEALTH REPORT ---")
    print(f"Score: {result['health_score']}/100 - {result['status']}")
    print(f"Current: R{result['current_net_worth']:,}")
    print(f"Growth: R{result['monthly_growth']:,}/mo")
    print(f"Risk: {result['risk_level']}")
    print(f"Time to R3M: {result['months_to_3m']} months")
    print(f"Advice: {result['advice']}")
    print("\n6-Month Forecast:")
    for f in result['forecast']:
        print(f" Month {f['month']}: R{f['net_worth']:,}")