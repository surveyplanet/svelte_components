<script>export let bgColor;
export let textColor;
</script>

<span
	class="sp-badge"
	style:background-color={bgColor}
	style:color={textColor}>
	<slot />
</span>

<style>/**
 * Capitalize the first letter of a word
 */
/**
 * Remove the units (e.g.: px, rem, etc.) from a measurement
 */
/**
 * Remove the units (e.g.: px, rem, etc.) from a measurement
 */
.sp-badge {
  box-sizing: border-box;
  display: inline-block;
  height: 0.875rem;
  max-width: 100%;
  padding: 0.5px 0.375rem;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  border-radius: 10px;
  color: #162137;
  font: normal 700 0.625rem/130% "Suisse Screen Bold", "Helvetica Neue", Helvetica, Arial, sans-serif;
  line-height: 0.875rem;
  font-size: 0.5rem;
  text-transform: uppercase;
  background-color: #ffe978;
  overflow: hidden;
  text-overflow: ellipsis;
}
.sp-badge :global(.sp-icon) {
  width: 12px;
  height: 12px;
}</style>
