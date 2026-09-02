import Link from "next/link";

export type SourceReference = {
  title: string;
  detail: string;
  href: string;
  consultationDate?: string;
};

type SourceNotesProps = {
  references: SourceReference[];
};

function formatConsultationDate(date: string) {
  return new Intl.DateTimeFormat("ca-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export default function SourceNotes({ references }: SourceNotesProps) {
  return (
    <aside className="wrap source-notes" aria-labelledby="source-notes-title">
      <div className="source-notes-heading">
        <div>
          <p className="section-kicker">RIGOR I TRANSPARÈNCIA</p>
          <h2 id="source-notes-title">Fonts i criteris d’aquesta fitxa</h2>
        </div>
        <Link href="/fonts-i-metodologia" className="text-link">
          Consulta la metodologia completa →
        </Link>
      </div>
      <ul className="source-reference-list">
        {references.map((reference) => (
          <li key={`${reference.title}-${reference.detail}`}>
            <a href={reference.href} target="_blank" rel="noreferrer">
              <strong>{reference.title}</strong>
              <span>{reference.detail}</span>
            </a>
            {reference.consultationDate && (
              <time dateTime={reference.consultationDate} className="source-consulted">
                Consulta: {formatConsultationDate(reference.consultationDate)}
              </time>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
