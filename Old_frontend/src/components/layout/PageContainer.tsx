// frontend/src/components/layout/PageContainer.tsx

export default function PageContainer({ children }) {
  return (
    <div className="max-w-7xl mx-auto w-full">
      {children}
    </div>
  );
}
