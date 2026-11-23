// @ts-nocheck
import { customTicker, customTimers } from "../customGuard.ts";
const __mk = customTicker("ConsultazionePianoUrbanistico");
const { setTimeout, setInterval, clearTimeout, clearInterval } = customTimers("ConsultazionePianoUrbanistico");
import { useState } from "react";
import { Badge, Button, Card, Field, TextInput, useTable } from "../floware";

export default function ConsultazionePianoUrbanistico(props) {__mk();
  const table = useTable("piano-urbanistico");
  const [foglio, setFoglio] = useState("");
  const [mappale, setMappale] = useState("");
  const [ricerca, setRicerca] = useState(null);
  if (!table) return <Card title="Piano urbanistico comunale"><p>Archivio dimostrativo non disponibile.</p></Card>;
  const colonne = ["Foglio", "Mappale", "Destinazione d’uso", "Zona", "Indicazioni del piano", "Riferimento dimostrativo"];
  if (colonne.some((nome) => (__mk(), table.column(nome) < 0))) return <Card title="Piano urbanistico comunale"><p>Le colonne necessarie alla consultazione non sono disponibili.</p></Card>;
  const risultati = ricerca ? table.rows.filter((riga) => (__mk(), table.value(riga, "Foglio").trim() === ricerca.foglio && table.value(riga, "Mappale").trim() === ricerca.mappale)) : [];
  function cerca() {__mk();
    setRicerca({ foglio: foglio.trim(), mappale: mappale.trim() });
  }
  return (
    <Card title="Piano urbanistico comunale">
      <div className="space-y-4">
        <Badge tone="primary">Dati dimostrativi</Badge>
        <p className="text-sm text-(--mk-muted)">Particelle, destinazioni e indicazioni sono inventate. Non sostituiscono la consultazione del piano vigente e non hanno valore certificativo.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <TextInput label="Foglio" value={foglio} onChange={(testo) => {__mk(); setFoglio(testo); setRicerca(null); }} placeholder="Esempio: 12" />
          <TextInput label="Mappale" value={mappale} onChange={(testo) => {__mk(); setMappale(testo); setRicerca(null); }} placeholder="Esempio: 145" />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={cerca} disabled={!foglio.trim() || !mappale.trim()}>Cerca particella</Button>
          <Button variant="secondary" onClick={() => {__mk(); setFoglio("12"); setMappale("145"); setRicerca({ foglio: "12", mappale: "145" }); }}>Mostra esempio</Button>
        </div>
        <p className="text-sm text-(--mk-muted)">Esempi disponibili, foglio / mappale: {table.rows.map((riga) => (__mk(), table.value(riga, "Foglio") + " / " + table.value(riga, "Mappale"))).join("; ")}.</p>
        <div aria-live="polite" className="space-y-3">
          {ricerca && <p>Ricerca: foglio {ricerca.foglio}, mappale {ricerca.mappale}.</p>}
          {ricerca && risultati.length === 0 && <p>Nessuna corrispondenza nell’archivio dimostrativo. Questo esito non indica l’assenza della particella nel piano reale.</p>}
          {risultati.map((riga, indice) => (__mk(), <div key={indice} className="space-y-3 rounded-lg border border-(--mk-border) bg-(--mk-subtle) p-4">
            <Badge tone="neutral">Esito dimostrativo</Badge>
            {colonne.map((nome) => (__mk(), <Field key={nome} label={nome}>{table.value(riga, nome)}</Field>))}
          </div>))}
        </div>
      </div>
    </Card>
  );
}
