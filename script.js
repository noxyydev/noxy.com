const userId = "1413826380029755504"; // Lanyard API user ID
const avatarEl = document.getElementById("avatar");
const usernameEl = document.getElementById("username");
const statusEl = document.getElementById("status");
const statusDot = document.getElementById("statusDot");
const activityEl = document.getElementById("activity");

async function fetchDiscordData() {
    try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
        const data = await response.json();

        const user = data.data;

        // Avatar
        avatarEl.src = `https://cdn.discordapp.com/avatars/${user.discord_user.id}/${user.discord_user.avatar}.png?size=1024`;

        // Username
        usernameEl.textContent = `${user.discord_user.username}#${user.discord_user.discriminator}`;

        // Status
        const status = user.discord_status;
        statusEl.textContent = `Durum: ${status.charAt(0).toUpperCase() + status.slice(1)}`;

        // Status Dot Renkleri
        const statusColors = {
            online: "#43b581",
            idle: "#faa61a",
            dnd: "#f04747",
            offline: "#747f8d"
        };
        statusDot.style.backgroundColor = statusColors[status] || "gray";

        // Aktif Etkinlik
        if(user.activities && user.activities.length > 0) {
            const activity = user.activities[0];
            if(activity.type === 0) {
                activityEl.textContent = `Aktivite: Oynuyor ${activity.name}`;
            } else if(activity.type === 2) {
                activityEl.textContent = `Aktivite: Yayında ${activity.name}`;
            } else if(activity.name === "Spotify") {
                activityEl.textContent = `Aktivite: Dinliyor ${activity.details} - ${activity.state}`;
            } else {
                activityEl.textContent = `Aktivite: ${activity.name}`;
            }
        } else {
            activityEl.textContent = "Aktivite: Yok";
        }

    } catch (error) {
        console.error("API verisi alınamadı:", error);
        statusEl.textContent = "Durum: Bilinmiyor";
        activityEl.textContent = "Aktivite: Bilinmiyor";
    }
}

// Sayfa yüklendiğinde veri çek
fetchDiscordData();
