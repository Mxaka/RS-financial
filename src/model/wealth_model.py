import numpy as np
from sklearn.linear_model import LinearRegression


X = np.array([
    [0.8, 0.3, 0], [0.7, 0.4, 0], [0.6, 0.5, 1],
    [0.5, 0.6, 1], [0.4, 0.7, 2], [0.3, 0.8, 3],
    [0.2, 0.9, 4], [0.75, 0.35, 0], [0.55, 0.55, 2]
])
y = np.array([55000, 40000, 20000, 5000, -10000, -25000, -40000, 50000, 8000])

model = LinearRegression()
model.fit(X, y)

def predict(client):
    """ client = {total, investments, spend, income, claims_count} """
    inv_ratio = client['investments'] / client['total']
    spend_ratio = client['spend'] / client['income']

    growth = float(model.predict([[inv_ratio, spend_ratio, client['claims_count']]])[0])

    # Score
    score = 50
    if inv_ratio > 0.5: score += 25
    if spend_ratio < 0.5: score += 20
    if client['claims_count'] <=1: score += 10
    if spend_ratio > 0.7: score -= 20
    if client['claims_count'] > 2: score -= 15
    score = max(0, min(100, int(score)))

    status = "CREATE" if score >=75 else "PRESERVE" if score <50 else "STABLE"

    forecast = []
    cur = client['total']
    for i in range(1,7):
        cur += growth
        forecast.append(int(cur))

    # Helpful action
    if status == "CREATE":
        action = f"On track! Invest R5k extra/mo to reach R3M in {max(1,int((3000000-client['total'])/growth))} months"
    elif status == "PRESERVE":
        action = "Risk: Cut spending to 50% of income. Your claims are high - review insurance"
    else:
        action = "Stable. Shift 10% more into investments to start creating wealth"

    return {"score": score, "status": status, "growth": int(growth), "forecast": forecast, "action": action, "risk": "HIGH" if spend_ratio>0.7 else "LOW"}

if __name__ == "__main__":
    test = {"total":2450890,"investments":1450000,"spend":45200,"income":80000,"claims_count":2}
    print(predict(test))