export function Footer() {
  return (
    <footer className="bg-soft py-10 mt-6">
      <div className="max-w-wrap mx-auto px-5 flex flex-wrap gap-4 justify-between items-center text-sm text-ink-faint">
        <span>© 2026 StudiaCare · StudiaCare.com</span>
        <span>
          {/* {{NEED FROM CLIENT: legal pages + registered business name for footer}} */}
          <a href="#" className="text-ink-faint hover:text-brand">
            Terms
          </a>{" "}
          ·{" "}
          <a href="#" className="text-ink-faint hover:text-brand">
            Privacy
          </a>
        </span>
      </div>
    </footer>
  );
}
