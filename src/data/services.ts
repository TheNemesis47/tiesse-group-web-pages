export type Service = { id: string; title: string; desc: string };

export const SERVICES: Service[] = [
    { id: 'mentorship', title: 'Mentorship 1:1', desc: 'Percorsi personalizzati con mentor senior: obiettivi, piano d’azione, accountability settimanale e supporto nelle decisioni.' },
    { id: 'academy',    title: 'Academy',        desc: 'Programmi intensivi su leadership, soft skills e strumenti di business. Moduli pratici, case study e project work.' },
    { id: 'incubation', title: 'Incubazione',    desc: 'Dall’idea al modello di business: validazione, go-to-market, metriche e rete di partner e advisor.' },
    { id: 'network',    title: 'Networking',     desc: 'Eventi, masterclass e community di imprenditori. Connessioni di valore, opportunità reali.' },
    { id: 'sales',      title: 'Sales Bootcamp', desc: 'Tecniche di vendita moderne, funnel e CRM. Role-play, KPI e training pratico.' },
    { id: 'career',     title: 'Career Coaching',desc: 'Posizionamento, personal brand, portfolio e negoziazione. Strategia su misura.' }
];
