import { useRovingTabIndex } from "./use-roving-tab-index";

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
}

function Tabs({ tabs }: TabsProps) {
  const { refs, index, setIndex, onKeyDown } = useRovingTabIndex(tabs.length);

  return (
    <div role="tablist" aria-label="Sample tabs" onKeyDown={onKeyDown}>
      {tabs.map((t, i) => (
        <button
          key={t.id}
          ref={(el) => {
            refs.current[i] = el;
          }}
          role="tab"
          aria-selected={i === index}
          aria-controls={`${t.id}-panel`}
          tabIndex={i === index ? 0 : -1}
          onClick={() => setIndex(i)}
        >
          {t.label}
        </button>
      ))}
      {tabs.map((t, i) => (
        <div
          key={t.id + "-panel"}
          id={`${t.id}-panel`}
          role="tabpanel"
          hidden={i !== index}
          aria-labelledby={t.id}
        >
          {/* panel content */}
        </div>
      ))}
    </div>
  );
}

const tabsData: Tab[] = [
  { id: "tab1", label: "Tab 1" },
  { id: "tab2", label: "Tab 2" },
  { id: "tab3", label: "Tab 3" },
];

export function RovingTabIndexExample() {
  return <Tabs tabs={tabsData} />;
}
