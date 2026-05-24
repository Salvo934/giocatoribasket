import type { ReactNode } from "react";
import Link from "next/link";
import type { ResolvedLegalContext } from "@/lib/legal";
import { CookieSettingsButton } from "./CookieSettingsButton";

const IT_MONTHS = [
  "gennaio",
  "febbraio",
  "marzo",
  "aprile",
  "maggio",
  "giugno",
  "luglio",
  "agosto",
  "settembre",
  "ottobre",
  "novembre",
  "dicembre",
] as const;

function formatPolicyDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!m) return iso;
  const month = Number(m[2]);
  const day = Number(m[3]);
  if (month < 1 || month > 12) return iso;
  return `${day} ${IT_MONTHS[month - 1]} ${m[1]}`;
}

type ShellProps = {
  legal: ResolvedLegalContext;
  title: string;
  children: ReactNode;
};

function LegalDocNav({ legal, className }: { legal: ResolvedLegalContext; className?: string }) {
  return (
    <nav
      className={className ?? "flex flex-wrap gap-x-4 gap-y-2 text-xs text-zinc-500"}
      aria-label="Informazioni legali"
    >
      {legal.usesExternalPrivacy && legal.externalPrivacyUrl ? (
        <a
          href={legal.externalPrivacyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-zinc-300"
        >
          Privacy
        </a>
      ) : (
        <Link href={legal.privacyPath} className="hover:text-zinc-300">
          Privacy
        </Link>
      )}
      {legal.usesExternalCookiePolicy && legal.externalCookieUrl ? (
        <a
          href={legal.externalCookieUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-zinc-300"
        >
          Cookie policy
        </a>
      ) : (
        <Link href={legal.cookiePath} className="hover:text-zinc-300">
          Cookie policy
        </Link>
      )}
      <Link href={legal.profilePath} className="hover:text-zinc-300">
        Profilo atleta
      </Link>
      <CookieSettingsButton className="hover:text-zinc-300" />
    </nav>
  );
}

export function LegalDocumentShell({ legal, title, children }: ShellProps) {
  const policyDateLabel = formatPolicyDate(legal.policyUpdated);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <Link
          href={legal.profilePath}
          className="text-sm text-zinc-500 transition hover:text-accent"
        >
          ← Torna al profilo di {legal.athleteName}
        </Link>
        <header className="mt-8 border-b border-white/10 pb-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600">Player Card</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h1>
          <p className="mt-3 text-sm text-zinc-500">
            Sito dedicato a {legal.athleteName}
            {legal.siteOrigin ? (
              <>
                {" "}
                ·{" "}
                <span className="text-zinc-400">{legal.siteOrigin.replace(/^https?:\/\//, "")}</span>
              </>
            ) : null}
          </p>
          <p className="mt-2 text-xs text-zinc-600">
            Ultimo aggiornamento:{" "}
            <time dateTime={legal.policyUpdated}>{policyDateLabel}</time>
          </p>
        </header>
        <article className="mt-10 space-y-8 text-sm leading-relaxed text-zinc-300">{children}</article>
        <footer className="mt-14 border-t border-white/10 pt-8">
          <LegalDocNav legal={legal} />
        </footer>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a href={href} className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function MailLink({ email }: { email: string }) {
  return (
    <a href={`mailto:${email}`} className="text-accent hover:underline">
      {email}
    </a>
  );
}

export function PrivacyPolicyContent({ legal }: { legal: ResolvedLegalContext }) {
  const { controller, platform } = legal;

  return (
    <>
      <p className="text-zinc-400">
        Ai sensi degli artt. 13 e 14 del Regolamento (UE) 2016/679 (&ldquo;GDPR&rdquo;), il titolare
        del trattamento informa gli utenti sui trattamenti effettuati tramite questo sito web.
      </p>

      <Section title="1. Titolare del trattamento">
        <p>
          Il titolare del trattamento dei dati personali pubblicati su questo sito dedicato a{" "}
          <strong className="text-zinc-100">{legal.athleteName}</strong> è:
        </p>
        <ul className="list-disc space-y-1 pl-5 text-zinc-400">
          <li>
            <strong className="text-zinc-200">{controller.name}</strong>
          </li>
          {controller.address ? <li>{controller.address}</li> : null}
          <li>
            Email: <MailLink email={controller.email} />
          </li>
          {controller.website ? (
            <li>
              Sito:{" "}
              <ExternalLink href={controller.website}>
                {controller.website.replace(/^https?:\/\//, "")}
              </ExternalLink>
            </li>
          ) : null}
        </ul>
        <p className="text-zinc-400">{legal.platformRoleNote}</p>
        <p className="text-zinc-400">
          Fornitore della piattaforma tecnica: {platform.name} (
          <ExternalLink href={platform.url}>{platform.url.replace(/^https?:\/\//, "")}</ExternalLink>
          ). Per richieste relative all&apos;infrastruttura: <MailLink email={platform.privacyEmail} />.
        </p>
      </Section>

      <Section title="2. Tipologie di dati trattati">
        <p>Attraverso questo sito possono essere trattate le seguenti categorie di dati:</p>
        <ul className="list-disc space-y-2 pl-5 text-zinc-400">
          <li>
            <strong className="text-zinc-200">Dati pubblicati sul profilo</strong>: nome, ruolo, dati
            sportivi, immagini, riferimenti a club e carriera, recapiti professionali indicati dal
            titolare (es. email agenzia, link social).
          </li>
          <li>
            <strong className="text-zinc-200">Dati di navigazione tecnici</strong>: indirizzo IP, log di
            accesso, tipo di browser e dispositivo, raccolti dal fornitore di hosting per sicurezza e
            funzionamento del servizio.
          </li>
          <li>
            <strong className="text-zinc-200">Preferenze privacy</strong>: scelta sui contenuti esterni,
            memorizzata localmente sul dispositivo (localStorage).
          </li>
          <li>
            <strong className="text-zinc-200">Dati da contenuti di terze parti</strong> (solo con
            consenso): cookie e identificatori generati da Google/YouTube quando visualizzi video
            incorporati o anteprime.
          </li>
          <li>
            <strong className="text-zinc-200">Comunicazioni volontarie</strong>: se contatti il titolare
            via email, WhatsApp o moduli esterni, verranno trattati i dati che decidi di inviare.
          </li>
        </ul>
        <p className="text-zinc-500">
          Non è previsto un form di registrazione utenti: non raccogliamo dati oltre a quelli indicati
          sopra e a quanto eventualmente invii spontaneamente.
        </p>
      </Section>

      <Section title="3. Finalità e base giuridica">
        <ul className="list-disc space-y-2 pl-5 text-zinc-400">
          <li>
            <strong className="text-zinc-200">Pubblicazione scheda atleta</strong> — interesse legittimo
            del titolare e, ove applicabile, esecuzione di rapporti con club, agenzia o atleta (art. 6,
            par. 1, lett. f) e lett. b) GDPR).
          </li>
          <li>
            <strong className="text-zinc-200">Sicurezza e manutenzione</strong> — legittimo interesse e
            obblighi tecnici del fornitore di hosting (art. 6, par. 1, lett. f) GDPR).
          </li>
          <li>
            <strong className="text-zinc-200">Memorizzazione preferenze cookie</strong> — necessità
            tecnica per rispettare le tue scelte (art. 6, par. 1, lett. f) GDPR).
          </li>
          <li>
            <strong className="text-zinc-200">Video YouTube e contenuti esterni</strong> — consenso
            dell&apos;utente (art. 6, par. 1, lett. a) GDPR e normativa ePrivacy sui cookie non
            essenziali).
          </li>
          <li>
            <strong className="text-zinc-200">Risposta a richieste di contatto</strong> — esecuzione di
            misure precontrattuali o legittimo interesse (art. 6, par. 1, lett. b) e lett. f) GDPR).
          </li>
        </ul>
      </Section>

      <Section title="4. Destinatari e trasferimenti">
        <p>I dati possono essere trattati da:</p>
        <ul className="list-disc space-y-1 pl-5 text-zinc-400">
          <li>{platform.name} (hosting e piattaforma Player Card);</li>
          <li>Google Ireland Limited / Google LLC (YouTube, solo se accetti i contenuti esterni);</li>
          <li>Meta Platforms Ireland Ltd. (WhatsApp, se apri un link di contatto WhatsApp);</li>
          <li>
            fornitori IT e soggetti del titolare, nominati responsabili del trattamento ai sensi
            dell&apos;art. 28 GDPR.
          </li>
        </ul>
        <p>
          Alcuni fornitori possono trattare dati anche fuori dallo Spazio Economico Europeo. In tal caso
          sono adottate garanzie adeguate (es. Standard Contractual Clauses o decisioni di
          adeguatezza) ove richieste dal GDPR.
        </p>
      </Section>

      <Section title="5. Conservazione">
        <p>
          I dati pubblicati sul profilo restano online finché il titolare mantiene attiva la scheda. I log
          tecnici del hosting sono conservati per il tempo necessario alla sicurezza del servizio. Le
          preferenze privacy restano sul tuo dispositivo finché non le cancelli. I cookie e le
          tecnologie non essenziali seguono le durate indicate nella{" "}
          <Link href={legal.cookiePath} className="text-accent hover:underline">
            Cookie policy
          </Link>
          .
        </p>
      </Section>

      <Section title="6. Diritti dell'interessato">
        <p>
          In qualità di interessato puoi esercitare i diritti di accesso, rettifica, cancellazione,
          limitazione, opposizione e portabilità (ove applicabile) scrivendo a{" "}
          <MailLink email={controller.email} />. Puoi revocare il consenso in qualsiasi momento, senza
          pregiudicare la liceità del trattamento basata sul consenso prestato prima della revoca.
        </p>
        <p>
          Hai inoltre diritto di proporre reclamo all&apos;Autorità Garante per la protezione dei dati
          personali (
          <ExternalLink href="https://www.garanteprivacy.it">garanteprivacy.it</ExternalLink>).
        </p>
      </Section>

      <Section title="7. Natura del conferimento">
        <p>
          La navigazione del sito e la consultazione del profilo non richiedono la comunicazione di dati
          personali aggiuntivi. Il conferimento di dati tramite email o altri canali di contatto è
          facoltativo, ma necessario per ricevere una risposta.
        </p>
      </Section>
    </>
  );
}

export function CookiePolicyContent({ legal }: { legal: ResolvedLegalContext }) {
  const { controller, platform } = legal;

  return (
    <>
      <p className="text-zinc-400">
        Questa informativa descrive cookie e tecnologie simili usate su questo sito. Per il trattamento
        dei dati personali in generale consulta anche l&apos;{" "}
        <Link href={legal.privacyPath} className="text-accent hover:underline">
          Informativa privacy
        </Link>
        .
      </p>

      <Section title="1. Cosa sono cookie e tecnologie simili">
        <p>
          I cookie sono piccoli file di testo salvati sul tuo dispositivo. Oltre ai cookie, possiamo usare
          lo <strong className="text-zinc-200">localStorage</strong> del browser per memorizzare le tue
          preferenze privacy: non è un cookie, ma svolge una funzione analoga per ricordare le scelte
          effettuate.
        </p>
        <p>
          Su questo sito distinguiamo strumenti <strong className="text-zinc-200">necessari</strong> e
          strumenti <strong className="text-zinc-200">non essenziali</strong> (contenuti video esterni),
          attivati solo con il tuo consenso.
        </p>
      </Section>

      <Section title="2. Elenco cookie e tecnologie">
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-lg text-left text-xs">
            <caption className="sr-only">
              Cookie e tecnologie utilizzate su questo sito Player Card
            </caption>
            <thead className="bg-white/5 text-zinc-400">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Nome / categoria
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Finalità
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Durata
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Base / consenso
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/8 text-zinc-300">
              <tr>
                <td className="px-4 py-3">kh-cookie-consent-v1 (localStorage)</td>
                <td className="px-4 py-3">Memorizza le preferenze sui contenuti esterni</td>
                <td className="px-4 py-3">Fino a cancellazione o 12 mesi</td>
                <td className="px-4 py-3">Necessario (art. 6.1.f GDPR)</td>
              </tr>
              <tr>
                <td className="px-4 py-3">YouTube / Google</td>
                <td className="px-4 py-3">
                  Player e anteprime video (youtube-nocookie.com, i.ytimg.com)
                </td>
                <td className="px-4 py-3">Secondo policy Google</td>
                <td className="px-4 py-3">Solo con consenso</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Hosting ({platform.name})</td>
                <td className="px-4 py-3">Sicurezza, CDN, log tecnici di sessione</td>
                <td className="px-4 py-3">Sessione / log brevi</td>
                <td className="px-4 py-3">Necessario (art. 6.1.f GDPR)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="3. Come gestire le preferenze">
        <p>
          Al primo accesso puoi accettare tutti i contenuti, rifiutare quelli non necessari o aprire le
          impostazioni dettagliate. In qualsiasi momento puoi modificare la scelta dal link{" "}
          <strong className="text-zinc-200">Gestisci cookie</strong> nel footer del profilo o delle
          pagine legali.
        </p>
        <p>
          Puoi anche gestire cookie e dati salvati localmente dalle impostazioni del browser. La
          disattivazione delle tecnologie necessarie può compromettere alcune funzioni del sito.
        </p>
      </Section>

      <Section title="4. Titolare e contatti">
        <p>
          Titolare del trattamento: {controller.name} — <MailLink email={controller.email} />.
        </p>
        <p>
          Fornitore piattaforma tecnica: {platform.name} — <MailLink email={platform.privacyEmail} />.
        </p>
        <p>
          Per i trattamenti effettuati da Google/YouTube consulta la{" "}
          <ExternalLink href="https://policies.google.com/privacy">privacy policy di Google</ExternalLink>{" "}
          e l&apos;{" "}
          <ExternalLink href="https://policies.google.com/technologies/cookies">
            informativa cookie di Google
          </ExternalLink>
          .
        </p>
      </Section>
    </>
  );
}

export { LegalDocNav };
