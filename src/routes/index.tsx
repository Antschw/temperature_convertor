import { component$, useSignal } from "@builder.io/qwik";
import styles from './index.module.css';

function convert(value: number, from: string, to: string): number {
  let celsius: number;

  if (from === 'C') {
    celsius = value;
  } else if (from === 'F') {
    celsius = (value - 32) * 5 / 9;
  } else {
    celsius = value - 273.15;
  }

  if (to === 'C') {
    return celsius;
  }
  if (to === 'F') {
    return (celsius * 9 / 5) + 32;
  }
  return celsius + 273.15;
}

export default component$(() => {
  const temperature = useSignal(0);
  const unit = useSignal<'C' | 'F' | 'K'>('C');

  return (
    <div class={styles.container}>
      <div class={styles.wrapper}>
        {/* Header */}
        <div class={styles.header}>
          <h1 class={styles.title}>Temperature Converter</h1>
          <p class={styles.subtitle}>
            Convert between Celsius, Fahrenheit, and Kelvin
          </p>
        </div>

        {/* Main Card */}
        <div class={styles.card}>
          {/* Input Section */}
          <div class={styles.inputGroup}>
            <label class={styles.label}>Enter Temperature</label>
            <input
              type="number"
              value={temperature.value}
              onInput$={(e) => {
                temperature.value = parseFloat(
                  (e.target as HTMLInputElement).value
                ) || 0;
              }}
              class={styles.input}
              placeholder="0"
            />
          </div>

          {/* Unit Selector */}
          <div class={styles.inputGroup}>
            <label class={styles.label}>Select Unit</label>
            <div class={styles.buttonGroup}>
              <button
                onClick$={() => (unit.value = 'C')}
                class={`${styles.unitButton} ${unit.value === 'C' ? styles.active : ''}`}
              >
                <span class={styles.emoji}>°C</span>
                <span>Celsius</span>
              </button>

              <button
                onClick$={() => (unit.value = 'F')}
                class={`${styles.unitButton} ${unit.value === 'F' ? styles.active : ''}`}
              >
                <span class={styles.emoji}>°F</span>
                <span>Fahrenheit</span>
              </button>

              <button
                onClick$={() => (unit.value = 'K')}
                class={`${styles.unitButton} ${unit.value === 'K' ? styles.active : ''}`}
              >
                <span class={styles.emoji}>K</span>
                <span>Kelvin</span>
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div>
            <h3 class={styles.resultsTitle}>Converted Values</h3>
            <div class={styles.results}>
              {/* Celsius Card */}
              <div class={`${styles.resultCard} ${styles.celsius}`}>
                <div class={`${styles.iconBadge} ${styles.celsius}`}>
                  °C
                </div>
                <div class={styles.resultContent}>
                  <p class={`${styles.resultLabel} ${styles.celsius}`}>Celsius</p>
                  <p class={`${styles.resultValue} ${styles.celsius}`}>
                    {convert(temperature.value, unit.value, 'C').toFixed(2)}°C
                  </p>
                </div>
              </div>

              {/* Fahrenheit Card */}
              <div class={`${styles.resultCard} ${styles.fahrenheit}`}>
                <div class={`${styles.iconBadge} ${styles.fahrenheit}`}>
                  °F
                </div>
                <div class={styles.resultContent}>
                  <p class={`${styles.resultLabel} ${styles.fahrenheit}`}>Fahrenheit</p>
                  <p class={`${styles.resultValue} ${styles.fahrenheit}`}>
                    {convert(temperature.value, unit.value, 'F').toFixed(2)}°F
                  </p>
                </div>
              </div>

              {/* Kelvin Card */}
              <div class={`${styles.resultCard} ${styles.kelvin}`}>
                <div class={`${styles.iconBadge} ${styles.kelvin}`}>
                  K
                </div>
                <div class={styles.resultContent}>
                  <p class={`${styles.resultLabel} ${styles.kelvin}`}>Kelvin</p>
                  <p class={`${styles.resultValue} ${styles.kelvin}`}>
                    {convert(temperature.value, unit.value, 'K').toFixed(2)}K
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
