import { useEffect, useState } from "react";
import api from "../api/axios";
import "./Progress.css";

function Progress() {
  const [stats, setStats] = useState({
    overall: {
      total: 0,
      completed: 0,
    },
    easy: {
      total: 0,
      completed: 0,
    },
    medium: {
      total: 0,
      completed: 0,
    },
    hard: {
      total: 0,
      completed: 0,
    },
  });

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const [chapterRes, progressRes] =
        await Promise.all([
          api.get("/content/chapters"),
          api.get("/progress"),
        ]);

      const completed =
        progressRes.data.completedProblems || [];

      const temp = {
        overall: {
          total: 0,
          completed: 0,
        },
        easy: {
          total: 0,
          completed: 0,
        },
        medium: {
          total: 0,
          completed: 0,
        },
        hard: {
          total: 0,
          completed: 0,
        },
      };

      chapterRes.data.forEach((chapter) => {
        chapter.problems.forEach((problem) => {
          const level =
            problem.difficulty.toLowerCase();

          temp.overall.total++;
          temp[level].total++;

          if (
            completed.some(
              (id) =>
                id.toString() ===
                problem._id.toString()
            )
          ) {
            temp.overall.completed++;
            temp[level].completed++;
          }
        });
      });

      setStats(temp);
    } catch (err) {
      console.log(err);
    }
  };

  const percent = (completed, total) => {
    if (total === 0) return 0;

    return Math.round(
      (completed / total) * 100
    );
  };

  const renderCard = (
    title,
    obj,
    colorClass
  ) => (
    <div className="progress-card">
      <div className="progress-card-header">
        <h2>{title}</h2>

        <span>
          {percent(
            obj.completed,
            obj.total
          )}
          %
        </span>
      </div>

      <p>
        {obj.completed} / {obj.total} Completed
      </p>

      <div className="progress-bar">
        <div
          className={`progress-fill ${colorClass}`}
          style={{
            width: `${percent(
              obj.completed,
              obj.total
            )}%`,
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="progress-container">

      <h1>Progress Dashboard</h1>

      <div className="progress-grid">

        {renderCard(
          "Overall",
          stats.overall,
          "purple"
        )}

        {renderCard(
          "Easy",
          stats.easy,
          "green"
        )}

        {renderCard(
          "Medium",
          stats.medium,
          "orange"
        )}

        {renderCard(
          "Hard",
          stats.hard,
          "red"
        )}

      </div>

    </div>
  );
}

export default Progress;