

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <div className="relative flex">
     
      <main className="w-full">
        {children}
      </main>
    </div>
  )}