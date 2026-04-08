package com.rocketdrop.backend.service;

import com.rocketdrop.backend.model.Order;
import com.rocketdrop.backend.model.OrderItem;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmailNotificationService {
    private static final Logger log = LoggerFactory.getLogger(EmailNotificationService.class);

    private final ObjectProvider<JavaMailSender> mailSenderProvider;

    @Value("${app.email.enabled:false}")
    private boolean emailEnabled;

    @Value("${app.email.from:no-reply@rocketdrop.com}")
    private String fromAddress;

    public EmailNotificationService(ObjectProvider<JavaMailSender> mailSenderProvider) {
        this.mailSenderProvider = mailSenderProvider;
    }

    public void sendOrderConfirmation(Order order, List<OrderItem> items) {
        if (!emailEnabled) {
            return;
        }

        String subject = "RocketDrop Order Confirmation #" + order.getId();
        String body = buildOrderConfirmationHtml(order, items);

        send(order.getUser().getEmail(), subject, body, true);
    }

    public void sendOrderStatusUpdate(Order order) {
        if (!emailEnabled) {
            return;
        }

        String subject = "RocketDrop Order Update #" + order.getId();
        String body = buildOrderStatusHtml(order);

        send(order.getUser().getEmail(), subject, body, true);
    }

    private String formatItemsHtml(List<OrderItem> items) {
        StringBuilder builder = new StringBuilder();
        for (OrderItem item : items) {
            builder.append("<tr><td style=\"padding:10px 12px;border-bottom:1px solid #e2e8f0;\">")
                    .append(item.getProduct().getName())
                    .append("</td><td style=\"padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:center;\">")
                    .append(item.getQuantity())
                    .append("</td><td style=\"padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:right;\">INR ")
                    .append(item.getPrice())
                    .append("</td></tr>");
        }
        return builder.toString();
    }

    private void send(String to, String subject, String body, boolean html) {
        JavaMailSender mailSender = mailSenderProvider.getIfAvailable();
        if (mailSender == null) {
            log.warn("Email sender bean not available; skipping email to {}", to);
            return;
        }

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, false, "UTF-8");
            helper.setFrom(fromAddress);
            helper.setTo(to);
            helper.setSubject(subject);
                        helper.setText(body, html);
            mailSender.send(message);
        } catch (Exception ex) {
            log.warn("Failed to send email notification to {}: {}", to, ex.getMessage());
        }
    }

        private String buildOrderConfirmationHtml(Order order, List<OrderItem> items) {
                return """
                                <div style="font-family:Segoe UI,Arial,sans-serif;max-width:640px;margin:0 auto;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;">
                                    <div style="background:linear-gradient(135deg,#1E1B6A,#2A278F);padding:20px;color:#fff;">
                                        <h2 style="margin:0;font-size:22px;">RocketDrop Order Confirmed</h2>
                                        <p style="margin:8px 0 0;opacity:.9;">Thanks, %s. Your drop is secured.</p>
                                    </div>
                                    <div style="padding:20px;background:#fff;">
                                        <p style="margin:0 0 10px;color:#334155;"><strong>Order ID:</strong> #%s</p>
                                        <p style="margin:0 0 10px;color:#334155;"><strong>Status:</strong> %s</p>
                                        <p style="margin:0 0 18px;color:#334155;"><strong>Total:</strong> INR %s</p>
                                        <table style="width:100%%;border-collapse:collapse;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
                                            <thead style="background:#f8fafc;">
                                                <tr>
                                                    <th style="padding:10px 12px;text-align:left;">Item</th>
                                                    <th style="padding:10px 12px;text-align:center;">Qty</th>
                                                    <th style="padding:10px 12px;text-align:right;">Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>%s</tbody>
                                        </table>
                                        <p style="margin:16px 0 0;color:#64748b;font-size:13px;">We will notify you as your order moves to shipped and delivered status.</p>
                                    </div>
                                </div>
                                """.formatted(
                                safeName(order.getUser().getName()),
                                order.getId(),
                                order.getStatus(),
                                order.getTotalPrice(),
                                formatItemsHtml(items)
                );
        }

        private String buildOrderStatusHtml(Order order) {
                return """
                                <div style="font-family:Segoe UI,Arial,sans-serif;max-width:620px;margin:0 auto;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;">
                                    <div style="background:#0f172a;padding:18px;color:#fff;">
                                        <h2 style="margin:0;font-size:20px;">Order Status Update</h2>
                                    </div>
                                    <div style="padding:20px;background:#fff;">
                                        <p style="margin:0 0 12px;color:#334155;">Hi %s,</p>
                                        <p style="margin:0 0 12px;color:#334155;">Your RocketDrop order <strong>#%s</strong> is now <strong>%s</strong>.</p>
                                        <p style="margin:0 0 12px;color:#334155;"><strong>Total:</strong> INR %s</p>
                                        <a href="#" style="display:inline-block;background:#1E1B6A;color:#fff;text-decoration:none;padding:10px 14px;border-radius:8px;font-weight:600;">Track in Account</a>
                                    </div>
                                </div>
                                """.formatted(
                                safeName(order.getUser().getName()),
                                order.getId(),
                                order.getStatus(),
                                order.getTotalPrice()
                );
        }

    private String safeName(String name) {
        if (name == null || name.isBlank()) {
            return "there";
        }
        return name;
    }
}
