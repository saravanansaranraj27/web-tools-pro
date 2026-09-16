const SkeletonPassword = () => (
  <div className="skeleton-container">
    <div className="skeleton-header">
      <div className="skeleton-icon"></div>
      <div className="skeleton-title"></div>
    </div>
    <div className="skeleton-desc"></div>
    <div className="skeleton-input"></div>
    <div className="skeleton-button"></div>
  </div>
);

const SkeletonStatus = () => (
  <div className="skeleton-container">
    <div className="skeleton-header">
      <div className="skeleton-icon"></div>
      <div className="skeleton-title"></div>
    </div>
    <div className="skeleton-desc"></div>
    <div className="skeleton-input"></div>
    <div className="skeleton-button"></div>
  </div>
);

const SkeletonWordCounter = () => (
  <div className="skeleton-container">
    <div className="skeleton-header">
      <div className="skeleton-icon"></div>
      <div className="skeleton-title"></div>
    </div>
    <div className="skeleton-desc"></div>
    <div className="skeleton-textarea"></div>
    <div className="skeleton-button"></div>
    <div className="skeleton-result">
      <div className="skeleton-stats-grid">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="skeleton-stat-item">
            <div className="skeleton-stat-value"></div>
            <div className="skeleton-stat-label"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SkeletonMdReader = () => (
  <div className="skeleton-container">
    <div className="skeleton-header">
      <div className="skeleton-icon"></div>
      <div className="skeleton-title"></div>
    </div>
    <div className="skeleton-desc"></div>
    <div className="skeleton-textarea"></div>
  </div>
);

export {
  SkeletonPassword,
  SkeletonStatus,
  SkeletonWordCounter,
  SkeletonMdReader,
};
