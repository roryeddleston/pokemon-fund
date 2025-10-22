export function Container({ className = "", children }) {
    return (
      <div className={`mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 ${className}`}>
        {children}
      </div>
    );
  }