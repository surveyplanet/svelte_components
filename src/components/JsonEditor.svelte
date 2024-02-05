<script lang="ts">
	function isValidJson(val) {
		try {
			JSON.parse(val);
		} catch (e) {
			return false;
		}

		return true;
	}
</script>

<textarea> </textarea>
