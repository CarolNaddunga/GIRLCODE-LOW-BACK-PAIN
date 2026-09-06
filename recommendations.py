def generate_recommendation(
    pain_level: int,
    pain_location: str,
    pain_duration: str,
    sitting_hours_per_day: float,
    exercise_frequency: str,
    posture_score: float,
    posture_notes: str,
) -> str:
    """Combines questionnaire + posture data into a short, actionable recommendation."""

    tips = []

    # Pain severity
    if pain_level >= 7:
        tips.append(
            "Your pain level is high — consider consulting a physiotherapist or doctor "
            "before starting any new exercise routine."
        )
    elif pain_level >= 4:
        tips.append("Moderate pain reported — gentle stretching and posture correction may help.")

    # Sitting habits
    if sitting_hours_per_day >= 8:
        tips.append(
            "You're sitting for long stretches — try standing or walking for 5 minutes every hour."
        )
    elif sitting_hours_per_day >= 5:
        tips.append("Consider taking short movement breaks every 1-2 hours while sitting.")

    # Exercise frequency
    if exercise_frequency == "never":
        tips.append(
            "Low activity levels can worsen back pain — starting with light daily walks "
            "or stretching can make a real difference."
        )

    # Posture-specific feedback
    if posture_score < 60:
        tips.append(
            f"Your posture assessment flagged some concerns ({posture_notes}). "
            "Focus on shoulder and core-strengthening exercises."
        )
    elif posture_score < 80:
        tips.append(
            f"Minor posture issues detected ({posture_notes}). "
            "Regular stretching and posture awareness should help."
        )
    else:
        tips.append("Your posture looks good overall — keep up good habits!")

    # Location-specific note
    if "lower" in pain_location.lower():
        tips.append("For lower back pain, core-strengthening and hip-flexor stretches are often helpful.")
    elif "neck" in pain_location.lower():
        tips.append("For neck pain, check your screen height and consider neck-stretching exercises.")

    return " ".join(tips)