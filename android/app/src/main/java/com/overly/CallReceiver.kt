package com.overly

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.provider.Settings
import android.telephony.TelephonyManager
import androidx.localbroadcastmanager.content.LocalBroadcastManager // Ensure this import is correct

class CallReceiver : BroadcastReceiver() {

    override fun onReceive(context: Context, intent: Intent) {
        val state = intent.getStringExtra(TelephonyManager.EXTRA_STATE)

        if (state == TelephonyManager.EXTRA_STATE_RINGING) {
            // Check for overlay permission
            if (hasOverlayPermission(context)) {
                // Send broadcast indicating call state
                val localIntent = Intent("callStateChanged")
                localIntent.putExtra("state", "ringing")
                LocalBroadcastManager.getInstance(context).sendBroadcast(localIntent)
            } else {
                // Request overlay permission if not granted
                requestOverlayPermission(context)
            }
        }
    }

    private fun hasOverlayPermission(context: Context): Boolean {
        return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            Settings.canDrawOverlays(context)
        } else {
            true // Permission is automatically granted on versions below Marshmallow
        }
    }

    private fun requestOverlayPermission(context: Context) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (!Settings.canDrawOverlays(context)) {
                val intent = Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION, Uri.parse("package:${context.packageName}"))
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                context.startActivity(intent)
            }
        }
    }
}
