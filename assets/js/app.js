/* ── Config ── */
    const DUE_DATE = new Date("2026-04-19T18:00:00Z");

    /* ── Elements ── */
    const card       = document.querySelector('[data-testid="test-todo-card"]');
    const checkbox   = document.getElementById("todo-complete");
    const titleEl    = document.querySelector('[data-testid="test-todo-title"]');
    const statusBadge = document.getElementById("status-badge");
    const timeEl     = document.getElementById("time-remaining-el");

    /* ── Time remaining ── */
    function getTimeRemaining() {
      const diff = DUE_DATE - Date.now();
      const abs  = Math.abs(diff);
      const mins  = Math.floor(abs / 60000);
      const hours = Math.floor(abs / 3600000);
      const days  = Math.floor(abs / 86400000);

      if (diff < 0) {
        if (mins  < 60) return { text: `Overdue by ${mins} minute${mins  !== 1 ? "s" : ""}`, overdue: true };
        if (hours < 24) return { text: `Overdue by ${hours} hour${hours !== 1 ? "s" : ""}`,  overdue: true };
        return { text: `Overdue by ${days} day${days !== 1 ? "s" : ""}`, overdue: true };
      }
      if (mins  < 2)  return { text: "Due now!",                                              overdue: false };
      if (hours < 1)  return { text: `Due in ${mins} minutes`,                                overdue: false };
      if (hours < 24) return { text: `Due in ${hours} hour${hours !== 1 ? "s" : ""}`,         overdue: false };
      if (days  === 1) return { text: "Due tomorrow",                                         overdue: false };
      return { text: `Due in ${days} days`,                                                   overdue: false };
    }

    function updateTimeRemaining() {
      const { text, overdue } = getTimeRemaining();
      timeEl.textContent = text;
      timeEl.setAttribute("aria-label", "Time remaining: " + text);
      timeEl.classList.toggle("overdue", overdue);
    }

    updateTimeRemaining();
    setInterval(updateTimeRemaining, 60000);

    /* ── Checkbox toggle ── */
    checkbox.addEventListener("change", function () {
      const done = this.checked;
      this.setAttribute("aria-checked", done);

      card.classList.toggle("completed", done);

      if (done) {
        statusBadge.textContent  = "Done";
        statusBadge.className    = "badge status-done";
        statusBadge.setAttribute("aria-label", "Status: Done");
      } else {
        statusBadge.textContent  = "In Progress";
        statusBadge.className    = "badge status-in-progress";
        statusBadge.setAttribute("aria-label", "Status: In Progress");
      }
    });