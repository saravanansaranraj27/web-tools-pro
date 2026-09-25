const SkeletonPassword = () => (
  <div className="skeleton-container">
    <div className="skeleton-header">
      <div className="skeleton skeleton-icon"></div>
      <div className="skeleton skeleton-title"></div>
    </div>

    <div className="skeleton skeleton-desc"></div>
    <div className="skeleton skeleton-input"></div>
    <div className="skeleton skeleton-button"></div>
  </div>
);

const SkeletonStatus = () => (
  <div className="skeleton-container">
    <div className="skeleton-header">
      <div className="skeleton skeleton-icon"></div>
      <div className="skeleton skeleton-title"></div>
    </div>

    <div className="skeleton skeleton-desc"></div>
    <div className="skeleton skeleton-input"></div>
    <div className="skeleton skeleton-button"></div>
  </div>
);

const SkeletonWordCounter = () => (
  <div className="skeleton-container">
    <div className="skeleton-header">
      <div className="skeleton skeleton-icon"></div>
      <div className="skeleton skeleton-title"></div>
    </div>

    <div className="skeleton skeleton-desc"></div>
    <div className="skeleton skeleton-textarea"></div>
    <div className="skeleton skeleton-button"></div>

    <div className="skeleton-result">
      <div className="skeleton-stats-grid">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="skeleton-stat-item">
            <div className="skeleton skeleton-stat-value"></div>
            <div className="skeleton skeleton-stat-label"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SkeletonMdReader = () => (
  <div className="skeleton-container">
    <div className="skeleton-header">
      <div className="skeleton skeleton-icon"></div>
      <div className="skeleton skeleton-title"></div>
    </div>

    <div className="skeleton skeleton-desc"></div>
    <div className="skeleton skeleton-textarea"></div>
  </div>
);

export {
  SkeletonPassword,
  SkeletonStatus,
  SkeletonWordCounter,
  SkeletonMdReader,
};
