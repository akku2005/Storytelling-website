// StoryPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/StoryPage.css"; // Optional: Import your CSS styles

const StoryPage = () => {
  const { storyId } = useParams(); // Get the storyId from the URL
  const [storyContent, setStoryContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStoryData = async () => {
      try {
        const filePath = `/assets/files/${storyId}.txt`; // Adjust the path based on your file structure
        const response = await fetch(filePath);

        if (!response.ok) {
          throw new Error("File not found");
        }

        const text = await response.text();
        setStoryContent(text);
      } catch (error) {
        console.error("Error fetching story data:", error);
        setStoryContent("Error loading story."); // Handle error gracefully
      } finally {
        setLoading(false);
      }
    };

    fetchStoryData();
  }, [storyId]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

  return (
    <div className="story-page">
      <h1>Story Title: {storyId.replace(/-/g, " ")}</h1>{" "}
      {/* Display story title */}
      <p>{storyContent}</p> {/* Display story content */}
    </div>
  );
};

export default StoryPage;
