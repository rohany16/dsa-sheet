import { useEffect, useState } from "react";
import {
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";

import api from "../api/axios";
import "./Topic.css";

function Dashboard() {
  const [chapters, setChapters] = useState([]);
  const [completedProblems, setCompletedProblems] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [chapterRes, progressRes] = await Promise.all([
        api.get("/content/chapters"),
        api.get("/progress"),
      ]);

      setChapters(chapterRes.data);

      setCompletedProblems(
        progressRes.data.completedProblems || []
      );

      const expandObj = {};

      chapterRes.data.forEach((chapter) => {
        expandObj[chapter._id] = true;
      });

      setExpanded(expandObj);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleChapter = (chapterId) => {
    setExpanded((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  const isCompleted = (problemId) => {
    return completedProblems.some(
      (id) => id.toString() === problemId.toString()
    );
  };

  const isChapterCompleted = (chapter) => {
    if (!chapter.problems || chapter.problems.length === 0) return false;
    return chapter.problems.every((problem) =>
      isCompleted(problem._id)
    );
  };

  const handleCheckbox = async (
    problemId,
    checked
  ) => {
    try {
      await api.post("/progress/update", {
        problemId,
        completed: checked,
      });

      if (checked) {
        setCompletedProblems((prev) => [
          ...prev,
          problemId,
        ]);
      } else {
        setCompletedProblems((prev) =>
          prev.filter(
            (id) =>
              id.toString() !== problemId.toString()
          )
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        Loading...
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>DSA Sheet</h1>

        <p>
          Master Data Structures & Algorithms
        </p>
      </div>

      {chapters.map((chapter) => (
        <div
          className="chapter-card"
          key={chapter._id}
        >
          <div
            className="chapter-header"
            onClick={() =>
              toggleChapter(chapter._id)
            }
          >
            <div className="chapter-title">
              {expanded[chapter._id] ? (
                <FaChevronDown />
              ) : (
                <FaChevronRight />
              )}

              <span>{chapter.title}</span>

              <span
                className={`status ${
                  isChapterCompleted(chapter) ? "completed" : "pending"
                }`}
                style={{ marginLeft: "15px", fontSize: "0.85em" }}
              >
                {isChapterCompleted(chapter) ? "Completed" : "Pending"}
              </span>
            </div>
          </div>

          {expanded[chapter._id] && (
            <div className="problem-table">
              <div className="problem-table-header">
                <div className="checkbox-header">✔</div>

                <div>Title</div>

                <div>LeetCode</div>

                <div>YouTube</div>

                <div>Article</div>

                <div>Level</div>

                <div>Status</div>
              </div>

              {chapter.problems &&
                chapter.problems.map(
                  (problem) => (
                    <div
                      className="problem-table-row"
                      key={problem._id}
                    >
                      {/* Checkbox */}

                      <div className="checkbox-cell">
                        <input
                          type="checkbox"
                          checked={isCompleted(
                            problem._id
                          )}
                          onChange={(e) =>
                            handleCheckbox(
                              problem._id,
                              e.target.checked
                            )
                          }
                        />
                      </div>

                      {/* Title */}

                      <div className="problem-name">
                        {problem.title}
                      </div>

                      {/* LeetCode */}

                      <div>
                        <a
                          href={
                            problem.practiceLink
                          }
                          target="_blank"
                          rel="noreferrer"
                        >
                          Open
                        </a>
                      </div>

                      {/* YouTube */}

                      <div>
                        <a
                          href={
                            problem.youtubeLink
                          }
                          target="_blank"
                          rel="noreferrer"
                        >
                          Open
                        </a>
                      </div>

                      {/* Article */}

                      <div>
                        <a
                          href={
                            problem.articleLink
                          }
                          target="_blank"
                          rel="noreferrer"
                        >
                          Open
                        </a>
                      </div>

                      {/* Difficulty */}

                      <div>
                        <span
                          className={`difficulty ${problem.difficulty.toLowerCase()}`}
                        >
                          {problem.difficulty}
                        </span>
                      </div>

                      {/* Status */}

                      <div>
                        <span
                          className={`status ${
                            isCompleted(problem._id)
                              ? "completed"
                              : "pending"
                          }`}
                        >
                          {isCompleted(
                            problem._id
                          )
                            ? "Completed"
                            : "Pending"}
                        </span>
                      </div>
                    </div>
                  )
                )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
