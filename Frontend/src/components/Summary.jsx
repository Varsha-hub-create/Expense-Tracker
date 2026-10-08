import {
  BarChart3,
  TrendingUp
} from "lucide-react";

export default function Summary({
  summary,
  totalExpense
}) {
  const maxValue =
    summary.length > 0
      ? Math.max(...summary.map((item) => item.total))
      : 0;

  return (
    <div className="card summary-card">
      <div className="card-header">
        <div>
          <p className="eyebrow">Analytics</p>

          <h2>Category Summary</h2>
        </div>

        <div className="summary-icon">
          <BarChart3 size={21} />
        </div>
      </div>

      <div className="total-box">
        <div>
          <span>Total Spending</span>

          <strong>
            ₹
            {Number(totalExpense).toLocaleString(
              "en-IN",
              {
                minimumFractionDigits: 2
              }
            )}
          </strong>
        </div>

        <TrendingUp size={28} />
      </div>

      {summary.length === 0 ? (
        <p className="muted-text">
          No category data available.
        </p>
      ) : (
        <div className="chart">
          {summary.map((item) => {
            const width =
              maxValue > 0
                ? (item.total / maxValue) * 100
                : 0;

            return (
              <div
                className="chart-row"
                key={item._id}
              >
                <div className="chart-label">
                  <span>{item._id}</span>

                  <strong>
                    ₹
                    {Number(
                      item.total
                    ).toLocaleString("en-IN")}
                  </strong>
                </div>

                <div className="bar-container">
                  <div
                    className="bar"
                    style={{
                      width: `${width}%`
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}