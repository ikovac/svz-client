import React from "react";
import { Link } from "gatsby";

const ArticleTeaser = ({ article }) => {
  return (
    <div className="article-teaser">
      <Link to={article.path.alias}>{article.title}</Link>
    </div>
  );
};

export default ArticleTeaser;
