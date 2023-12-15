const Seat = ({ seat, onToggle }) => {
  const backgroundColor = seat.status === "selected" ? "green" : "grey";
  return (
    <TouchableOpacity
      style={[styles.seat, { backgroundColor }]}
      onPress={() => onToggle(seat.id)}
    >
      <Text style={styles.seatText}>
        {seat.row}
        {seat.number}
      </Text>
    </TouchableOpacity>
  );
};
