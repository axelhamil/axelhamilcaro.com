const CHAMPS = ["prenom", "email"] as const;

export default function FormLoading() {
  return (
    <div className="trame flex min-h-svh items-center justify-center px-4 py-12">
      <div className="etiquette etiquette-carte w-full max-w-lg gap-6 p-6 sm:p-10">
        <div className="squelette h-6 w-28" />
        <div className="squelette h-10 w-3/4" />
        <div className="squelette h-4 w-full" />
        {CHAMPS.map((cle) => (
          <div key={cle} className="squelette h-11" />
        ))}
        <div className="squelette h-14" />
      </div>
    </div>
  );
}
